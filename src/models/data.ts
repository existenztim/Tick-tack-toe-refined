export const players = [
  {
    id: 'X',
    name: '',
    score: 0,
  },
  {
    id: 'O',
    name: '',
    score: 0,
  },
];

export const initBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

export const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]