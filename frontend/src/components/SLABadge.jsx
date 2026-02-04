const SLABadge = ({ breached }) => {
  return breached ? (
    <span style={{ color: "red", fontWeight: "bold" }}>
      Breached
    </span>
  ) : (
    <span style={{ color: "green" }}>Active</span>
  );
};

export default SLABadge;
