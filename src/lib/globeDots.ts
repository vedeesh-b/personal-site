import { geoBounds, geoCentroid, geoContains } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Feature, FeatureCollection } from 'geojson';
import type { Topology } from 'topojson-specification';
import countries110m from 'world-atlas/countries-110m.json';
import countries50m from 'world-atlas/countries-50m.json';
import { home, visitedIds } from '../data/travel';

/** [longitude, latitude, land (0), visited (1) or home (2)] */
export type GlobeDot = [number, number, 0 | 1 | 2];

type Bounded = {
	feature: Feature;
	bounds: [[number, number], [number, number]];
};

// Degrees between dots along each line of latitude.
const STEP = 2;

const countries = (topology: unknown) => {
	const t = topology as Topology;
	return (feature(t, t.objects.countries) as FeatureCollection).features;
};

const withBounds = (features: Feature[]): Bounded[] =>
	features.map((f) => ({ feature: f, bounds: geoBounds(f) }));

// Cheap bounding-box check first; geoContains is expensive. Bounds whose
// west edge is greater than the east edge cross the antimeridian.
const inBounds = ([[x0, y0], [x1, y1]]: Bounded['bounds'], [x, y]: number[]) =>
	y >= y0 && y <= y1 && (x0 <= x1 ? x >= x0 && x <= x1 : x >= x0 || x <= x1);

const contains = ({ feature, bounds }: Bounded, point: [number, number]) =>
	inBounds(bounds, point) && geoContains(feature, point);

let cache: GlobeDot[] | undefined;

/**
 * Samples an evenly spaced grid of points over the globe and keeps those on
 * land, flagging the ones inside visited countries and home. Computed once on the
 * server so the client only receives the dot coordinates.
 */
export function getGlobeDots(): GlobeDot[] {
	if (cache) return cache;

	const land = withBounds(
		countries(countries110m).filter((f) => f.properties?.name !== 'Antarctica'),
	);
	// Visited countries use the higher resolution data so small ones register.
	const visited = withBounds(
		countries(countries50m).filter(
			(f) => visitedIds.has(String(f.id)) || String(f.id) === home.id,
		),
	);
	const kind = (f: Feature): 1 | 2 => (String(f.id) === home.id ? 2 : 1);

	const dots: GlobeDot[] = [];
	const hit = new Set<Feature>();

	for (let lat = -58; lat <= 84; lat += STEP) {
		const count = Math.round((360 * Math.cos((lat * Math.PI) / 180)) / STEP);
		for (let i = 0; i < count; i++) {
			const point: [number, number] = [-180 + (i * 360) / count, lat];
			const visitedHit = visited.find((c) => contains(c, point));
			if (visitedHit) {
				hit.add(visitedHit.feature);
				dots.push([point[0], lat, kind(visitedHit.feature)]);
			} else if (land.some((c) => contains(c, point))) {
				dots.push([point[0], lat, 0]);
			}
		}
	}

	// Countries too small to catch a grid point (Malta, Hong Kong, …) get a
	// single dot at their centroid so they still show up.
	for (const { feature } of visited) {
		if (!hit.has(feature)) {
			const [lon, lat] = geoCentroid(feature);
			dots.push([lon, lat, kind(feature)]);
		}
	}

	cache = dots.map(([lon, lat, v]) => [
		Math.round(lon * 100) / 100,
		Math.round(lat * 100) / 100,
		v,
	]);
	return cache;
}
