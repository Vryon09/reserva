export interface ReservationTypes {
  tableId: string;
  _id: string;
  tableName: string;
  name: string;
  phone: string;
  reservationDate: string;
  status: string;
  reservationCode: string;
}

export interface ReservationResponseTypes {
  reservations: ReservationTypes[];
  total: number;
}

export interface Table {
  tableName: string;
  capacity: number;
  notes: string;
  status: string;
  reservations: Partial<ReservationTypes[]>;
  _id: string;
}

export interface ReservationSectionProps {
  isReservationPending: boolean;
  reservations: ReservationTypes[];
  reservationType: string;
  isTodaysReservation?: boolean;
}

export interface TableFormProps {
  handleSubmit: () => void;
  tableInfo: Partial<Table>;
  setTableInfo: React.Dispatch<React.SetStateAction<Partial<Table>>>;
  action: string;
  handleCloseModal: () => void;
}

export interface ReservationProps {
  reservation: ReservationTypes;
  reservationType: string;
  handleUpdate: (
    id: string,
    updatedReservation: Partial<ReservationPayload>,
  ) => void;
}

export interface ReservationActionProps {
  reservation: ReservationTypes;
  handleUpdate: (
    id: string,
    updatedReservation: Partial<ReservationPayload>,
  ) => void;
}

export interface ReservationPayload {
  _id?: string;
  tableName: string;
  name: string;
  phone: string;
  reservationDate: string;
  reservationCode?: string;
  status?: string;
}
