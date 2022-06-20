interface Props {
  value: string | null;
  winner: string | null;
  onClick: () => void;
}

export const Square = ({value, onClick, winner}: Props): JSX.Element => {
  if (!value) {
    return (
      <button
        className={`nes-btn nes-btn-square square ${Boolean(winner) ? "is-disabled" : ""}`}
        disabled={Boolean(winner)}
        onClick={onClick}
      >
        &nbsp;
      </button>
    );
  }

  return (
    <button
      disabled
      className={`nes-btn nes-btn-square square square_${value.toLocaleLowerCase()} animate__animated animate__flipInY animate__faster`}
    >
      {value}
    </button>
  );
};
