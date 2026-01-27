export class BitapSearch {
    constructor() { }

    /**
     * Bitap Algorithm (Shift-Or implementation)
     * Matches pattern in text with up to 'distance' errors.
     * 
     * @param text The text to search in.
     * @param pattern The pattern to search for.
     * @param distance Maximum allowed errors (Levenshtein distance).
     */
    match(text: string, pattern: string, distance: number = 2): boolean {
        const m = pattern.length;
        if (m === 0) return true;
        if (m > 31) {
            pattern = pattern.substring(0, 31);
        }

        const patternMask: Record<string, number> = {};
        for (let i = 0; i < m; i++) {
            const char = pattern[i];
            if (patternMask[char] === undefined) {
                patternMask[char] = ~0;
            }
            patternMask[char] &= ~(1 << i);
        }

        const R: number[] = new Array(distance + 1).fill(~0);

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const charMask = patternMask[char] ?? ~0;

            let oldRd1 = R[0];

            // R[0] = (R[0] << 1) | charMask
            R[0] = (R[0] << 1) | charMask;

            // Update R[1..distance]
            for (let d = 1; d <= distance; d++) {
                const tmp = R[d]; // prev_R[d]

                // Recurrence:
                // Match/Mismatch: (prev_R[d] << 1) | charMask
                // Substitution:   (prev_R[d-1] << 1)
                // Insertion:      (prev_R[d-1])
                // Deletion:       (curr_R[d-1] << 1)

                R[d] = ((tmp << 1) | charMask) & (oldRd1 << 1) & oldRd1 & (R[d - 1] << 1);

                oldRd1 = tmp;
            }

            // Check if matches
            // If the (m-1)th bit is 0, we have a match
            // (1 << (m - 1)) creates a mask with 1 at m-1 position.
            // We check if R[distance] has that bit as 0.
            if ((R[distance] & (1 << (m - 1))) === 0) {
                return true;
            }
        }

        return false;
    }
}
