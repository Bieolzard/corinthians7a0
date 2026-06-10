export interface Adversario {
  id: string;
  nome: string;
  overall: number;
}

export const adversarios = {
  oitavas: [
    {
      id: "atletico_nacional_2016",
      nome: "Atlético Nacional 2016",
      overall: 12,
    },
    {
      id: "santos_2011",
      nome: "Santos 2011",
      overall: 12,
    },
  ],

  quartas: [
    {
      id: "river_2018",
      nome: "River Plate 2018",
      overall: 12,
    },
  ],

  semi: [
    {
      id: "palmeiras_2021",
      nome: "Palmeiras 2021",
      overall: 12,
    },
  ],

  final: [
    {
      id: "boca_2000",
      nome: "Boca Juniors 2000",
      overall: 93,
    },
  ],
};