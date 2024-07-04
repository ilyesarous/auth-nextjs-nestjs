export type Offer = {
  id: number | undefined;
  position: string;
  positioname: string;
  departement: string;
  description: string;
  requirements: string;
  technologies: string;
  salary?: string;
  contract?: string;
  skills?: string;
  duration?: string;
  nbCondidats?: number;
};

export type OfferCard = {
  departement: string;
  positioname: string;
  position: string;
  nbCondidats: number | undefined;
  salary: number | undefined;
  description: string;
};
