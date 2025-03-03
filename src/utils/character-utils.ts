import {Size} from "../components/form/controls/LabelInput";

export const cardsForSize: Record<Size, { cards: number }> = {
	xl: { cards: 4 },
	lg: { cards: 3 },
	md: { cards: 2 },
	sm: { cards: 1 },
	base: { cards: 1 },
}
