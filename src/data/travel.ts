// Flags from flag-icons (MIT), 4:3. Imported as URLs so each is a cached
// file rather than inline markup.
import ae from 'flag-icons/flags/4x3/ae.svg?url';
import al from 'flag-icons/flags/4x3/al.svg?url';
import cz from 'flag-icons/flags/4x3/cz.svg?url';
import es from 'flag-icons/flags/4x3/es.svg?url';
import gb from 'flag-icons/flags/4x3/gb.svg?url';
import hk from 'flag-icons/flags/4x3/hk.svg?url';
import id from 'flag-icons/flags/4x3/id.svg?url';
import india from 'flag-icons/flags/4x3/in.svg?url';
import jp from 'flag-icons/flags/4x3/jp.svg?url';
import mt from 'flag-icons/flags/4x3/mt.svg?url';
import mv from 'flag-icons/flags/4x3/mv.svg?url';
import nl from 'flag-icons/flags/4x3/nl.svg?url';
import sc from 'flag-icons/flags/4x3/sc.svg?url';
import sg from 'flag-icons/flags/4x3/sg.svg?url';

export interface Country {
	name: string;
	/** URL of the country's flag, a 4:3 SVG. */
	flag: string;
	/** ISO 3166-1 numeric code, matching the ids in world-atlas. */
	id: string;
	/** [longitude, latitude] the globe's label points at. Picked by hand:
	 *  centroids of countries with far-flung islands can land in the sea. */
	anchor: [number, number];
}

export interface TravelYear {
	label: string;
	countries: Country[];
}

// Where I was born and grew up. Not a trip, so it sits apart from the list
// below and gets its own color on the globe.
export const home: Country = {
	name: 'India',
	flag: india,
	id: '356',
	anchor: [78.9, 22.0],
};

// Most recent first.
export const travel: TravelYear[] = [
	{
		label: '2026',
		countries: [{ name: 'Albania', flag: al, id: '008', anchor: [20.0, 41.1] }],
	},
	{
		label: '2025',
		countries: [
			{
				name: 'United Arab Emirates',
				flag: ae,
				id: '784',
				anchor: [54.4, 24.2],
			},
			{ name: 'Malta', flag: mt, id: '470', anchor: [14.4, 35.9] },
			{ name: 'Japan', flag: jp, id: '392', anchor: [138.3, 36.5] },
		],
	},
	{
		label: '2024',
		countries: [
			{ name: 'Spain', flag: es, id: '724', anchor: [-3.7, 40.2] },
			{ name: 'Czechia', flag: cz, id: '203', anchor: [15.4, 49.8] },
			{ name: 'The Netherlands', flag: nl, id: '528', anchor: [5.3, 52.2] },
		],
	},
	{
		label: '2018, 19',
		countries: [
			{ name: 'United Kingdom', flag: gb, id: '826', anchor: [-1.6, 52.6] },
		],
	},
	{
		label: '2017',
		countries: [
			{ name: 'Hong Kong SAR', flag: hk, id: '344', anchor: [114.2, 22.3] },
		],
	},
	{
		label: '2016',
		countries: [
			{ name: 'Indonesia', flag: id, id: '360', anchor: [113.9, -1.5] },
		],
	},
	{
		label: '2012, 13',
		countries: [
			{ name: 'Seychelles', flag: sc, id: '690', anchor: [55.5, -4.6] },
		],
	},
	{
		label: '2011',
		countries: [{ name: 'Maldives', flag: mv, id: '462', anchor: [73.5, 3.2] }],
	},
	{
		label: '2010',
		countries: [
			{ name: 'Singapore', flag: sg, id: '702', anchor: [103.8, 1.35] },
		],
	},
];

export const visitedIds = new Set(
	travel.flatMap((year) => year.countries.map((country) => country.id)),
);
