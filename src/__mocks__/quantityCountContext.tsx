interface QuantityCountProps {
  setQuantity: () => void;
  quantity: number;
  dispatch: boolean;
  id: number | null;
}

export const quantityCountContextDefaultValues: QuantityCountProps = {
  setQuantity: () => {},
  quantity: 1,
  dispatch: false,
  id: null,
};
