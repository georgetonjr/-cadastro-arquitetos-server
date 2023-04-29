export interface UpdateOrderServiceRequest {
  id: string;
  updateOptions: {
    isActive?: boolean;
    show?: boolean;
    title?: string;
    description?: string;
    price?: number;
  };
}
