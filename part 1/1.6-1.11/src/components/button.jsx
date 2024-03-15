function Button(prop) {
  return <button onClick={prop.onClick}>{prop.name}</button>;
}

export default Button;
