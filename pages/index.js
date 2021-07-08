import React from 'react'
import Link from 'next/link'

const Home = ({ todos }) => (
  <div>
    <div className="hero">
      <h1 className="title">ISR Demo</h1>
      <ul>
        {
          todos.map(({ id, title }) => (
            <li key={id}>
              <Link href={`/todos/${id}`} prefetch={false}>
                <a >{title}</a>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  </div>
)

export default Home


export async function getStaticProps() {
  await new Promise(res => setTimeout(res, 3000)) // to imitate slow api request
  const resp = await fetch(`https://jsonplaceholder.typicode.com/todos`)
  const todos = await resp.json()

  if (!todos.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      todos
    },
    revalidate: 10
  };
}
