import { Todo } from "../utils/types";
import Link from "next/link";
import Head from "next/head";

// Define the components props
interface IndexProps {
  todos: Array<Todo>;
}

// define the page component
function Index(props: IndexProps) {
  const { todos } = props;

  return (
    <div>
       <Head>
        <title>Idris Ay</title>
      </Head>
      <h1 className="text-3xl font-bold underline text-red-700">My Todo List..</h1>
      <h2>Click On Todo to see it individually</h2>
      <Link href="/todos/create">
        <button>Create a New Todo</button>
      </Link>
      {/* MAPPING OVER THE TODOS */}
      {todos.map((t) => (
        <div key={t._id}>
          <Link href={`/todos/${t._id}`}>
            <h3 style={{ cursor: "pointer" }}>
              {t.item} - {t.completed ? "completed" : "incomplete"}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps() {
  // get todo data from API
  const res = await fetch(process.env.API_URL as string);
  const todos = await res.json();

  // return props
  return {
    props: { todos },
  };
}

export default Index;
