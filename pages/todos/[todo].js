import Link from 'next/link'

export default function Todo({ todo }) {
  return (
    <div>
      <Link href="/" prefetch={false}><a>Home</a></Link>
      <h1>Todo Detail</h1>
      <h2>{JSON.stringify(todo, null, 2)}</h2>
    </div>
  )
}

export async function getStaticProps({ params }) {
  await new Promise(res => setTimeout(res, 5000)) // to imitate slow api request
  const resp = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.todo}`)
  const todo = await resp.json()

  if (!todo.id) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      todo
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
