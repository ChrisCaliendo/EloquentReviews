const About = () => {
    return (  
        <div className="border border-none shadow rounded-md p-5 max-w-3xl w-full mx-auto px-3 py-2 text-white bg-zinc-900 font-semibold">
            <h1>What Is This Website?</h1>
            <p className="text-left text-white dark:text-gray-400">
                This website is used for finding funny reviews off of the video game distribution and purchansing platform Steam.
                This website is still in development and more functionality will be added relatively soon including custom game 
                searching, being able to find specific kinds of reviews based on keywords or catagories and advanced options to 
                control how the reviews are displayed once found.
            </p>
            <br />
            <h1>Functions</h1>
            <p className="text-left text-white dark:text-gray-400">
                The main function of finding reviews is mainly controlled in the Home page. There are currently 2 options in 
                using the search and scrape algorithm. The Find Random and Find Similar buttons. CAUTION: Using the site for 
                the first time may take a few minutes to boot the external server so please be patience as searching will be 
                quicker after the initial load
            </p>
            <br />
            <h2 className="text-left text-white dark:text-gray-300">Find Random</h2>
            <p className="text-left text-white dark:text-gray-400"> 
                Finds a review from the top funniest rated reviews of the top most relevant games on the Steam platform
            </p>
            <br />
            <h2 className="text-left text-white dark:text-gray-300">Find Random</h2>
            <p className="text-left text-white dark:text-gray-400">
                Finds another funny review from thesame game as the last found. Requires at least one game to have been 
                previously found
            </p>
            <br />
            <h1>Content Settings</h1>
            <p className="text-left text-white dark:text-gray-400">Coming Soon</p>
            <br />
            <h1>Display Settings</h1>
            <p className="text-left text-white dark:text-gray-400">Coming Soon</p>
            <br />
        </div>
    );
}
export default About;