export type Offer = {
  id?: number;
  position: string;
  positioname: string;
  departement: string;
  description: string;
  requirements: string;
  technologies: string;
  salary?: number;
  contract?: string;
  skills?: string;
  duration?: string;
  nbCondidats?: number;
};

export type OfferCard = {
  id?: number;
  departement: string;
  positioname: string;
  position: string;
  nbCondidats: number | undefined;
  salary: number | undefined;
  description: string;
};
