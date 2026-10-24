import Alert from './Alert.astro';
import ArchitectureDiagram from './ArchitectureDiagram.astro';
import Badge from './Badge.astro';
import BarChart from './BarChart.astro';
import CardGrid from './CardGrid.astro';
import CuisineGroupGrid from './CuisineGroupGrid.astro';
import EditorToCard from './EditorToCard.astro';
import Figure from './Figure.astro';
import FlowDiagram from './FlowDiagram.astro';
import Link from './Link.astro';
import SequenceDiagram from './SequenceDiagram.astro';
import Table from './Table.astro';
import TrackedPrediction from './TrackedPrediction.astro';
import VotedPrediction from './VotedPrediction.astro';

// Passed to <Content components={...} />, so MDX files can use these without importing them.
// `a` also restyles plain Markdown links: [text](url).
export const mdxComponents = {
	a: Link,
	Alert,
	ArchitectureDiagram,
	Badge,
	BarChart,
	CardGrid,
	CuisineGroupGrid,
	EditorToCard,
	Figure,
	FlowDiagram,
	Link,
	SequenceDiagram,
	Table,
	TrackedPrediction,
	VotedPrediction,
};
