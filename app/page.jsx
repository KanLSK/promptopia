import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        {/** if you see _ it means that it comes from our own styling in globals.css */}
        <h1 className="head_text text-center">
            Discover & Share
            <br className="max-md:hidden`"/>
            <span className="orange_gradient text-center"> AI-powered Prompts </span>
        </h1>
        <p className="desc text-center">
            Promptopia is an open-source AI prompting tool for modern world to discover,  create and share creative prompts
        </p>
        {/** Feed */}
        <Feed />
    </section>
  )
}

export default Home