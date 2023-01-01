const Caret = (props) => {
  let name = props.order === "asc" ? "fa fa-caret-up" : "fa fa-caret-down";

  return <i className={name}></i>;
};

export default Caret;
