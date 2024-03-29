const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {
        props.parts.map(x=>(
          <Part part={x.name} exercises={x.exercises} />
        ))
      }
    </div>
  );
};

const Total = (props) => {
  let sum = 0;
  props.total.forEach(x => {
    sum += x.exercises;
  })
  return <p>{sum}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <p>
        <Header course={course.name} />
      </p>
      <p>
        <Content parts={course.parts}/>
      </p>
      <p>
        <Total total={course.parts} />
      </p>
    </div>
  );
};

export default App;
