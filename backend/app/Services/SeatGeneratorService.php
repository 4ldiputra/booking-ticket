<?php

namespace App\Services;

use InvalidArgumentException;

class SeatGeneratorService
{
    /**
     * Seat layout configuration per aircraft type.
     * Each entry defines row range and allowed seat columns.
     */
    private array $layouts = [
        'ATR' => [
            'rows'    => [1, 18],
            'columns' => ['A', 'C', 'D', 'F'],
        ],
        'Airbus 320' => [
            'rows'    => [1, 32],
            'columns' => ['A', 'B', 'C', 'D', 'E', 'F'],
        ],
        'Boeing 737 Max' => [
            'rows'    => [1, 32],
            'columns' => ['A', 'B', 'C', 'D', 'E', 'F'],
        ],
    ];

    /**
     * Generate exactly 3 unique random seats for the given aircraft type.
     *
     * @param  string  $aircraftType  One of: ATR, Airbus 320, Boeing 737 Max
     * @return array<string>          Array of 3 seat strings, e.g. ['3B', '7C', '14D']
     *
     * @throws InvalidArgumentException If the aircraft type is not recognized.
     */
    public function generate(string $aircraftType): array
    {
        if (! isset($this->layouts[$aircraftType])) {
            throw new InvalidArgumentException("Unknown aircraft type: {$aircraftType}");
        }

        $layout  = $this->layouts[$aircraftType];
        $allSeats = $this->buildSeatPool($layout['rows'], $layout['columns']);

        // Shuffle and pick the first 3 — guarantees uniqueness without looping
        shuffle($allSeats);

        return array_slice($allSeats, 0, 3);
    }

    /**
     * Build the full pool of valid seat identifiers for a given layout.
     *
     * @param  int[]    $rows     [minRow, maxRow]
     * @param  string[] $columns  Allowed column letters
     * @return string[]
     */
    private function buildSeatPool(array $rows, array $columns): array
    {
        $pool = [];

        for ($row = $rows[0]; $row <= $rows[1]; $row++) {
            foreach ($columns as $col) {
                $pool[] = "{$row}{$col}";
            }
        }

        return $pool;
    }
}
