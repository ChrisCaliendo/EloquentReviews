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
                The main function of finding reviews is mainly controlled in the Home page. There are currently 3 options in 
                using the search and scrape algorithm. The Find Random, Similar and Search Review buttons. CAUTION: Using the site for 
                the first time may take a few minutes to boot the external server so please be patience as searching will be 
                quicker after the initial load.
            </p>
            <br />
            <h2 className="text-left text-white dark:text-gray-300">Find Random Review</h2>
            <p className="text-left text-white dark:text-gray-400"> 
                Finds a review from the top funniest rated reviews of the top most relevant games on the Steam platform.
            </p>
            <br />
            <h2 className="text-left text-white dark:text-gray-300">Find Similar Review</h2>
            <p className="text-left text-white dark:text-gray-400">
                Finds another funny review from thesame game as the last found. Requires at least one game to have been 
                previously found.
            </p>
            <br />
            <h2 className="text-left text-white dark:text-gray-300">Find Search Review</h2>
            <p className="text-left text-white dark:text-gray-400">
                Finds a review based on the name you put in the search bar. Will find a review from a game that matches 
                the name the closest.
            </p>
            <br />
            <h1>Content Settings</h1>
            <p className="text-left text-white dark:text-gray-400">These settings allow for the user to find reviews with specific content requirements or 
            from games with specific tags.</p>
            <br />
            <h2 className="text-left text-white dark:text-gray-300">Random Search Tags</h2>
            <p className="text-left text-white dark:text-gray-400">
                A list of tags that the user can use to restrict the types of games reviews are taken from at random. 
                This doesnt affect the "Find Search Review" function as that is based on the given name in the search 
                bar to avoid confusion.
            </p>
            <h2 className="text-left text-white dark:text-gray-300">General Search Ratings</h2>
            <p className="text-left text-white dark:text-gray-400">
                Allows the user to decide whether they want to see only positive reviews or negative reviews.
            </p>
            <h2 className="text-left text-white dark:text-gray-300">Review Content Parameters</h2>
            <p className="text-left text-white dark:text-gray-400">
                Allows the user to deside how long they want the reviews they search for to be whether they want short 
                statements no longer than a phrase or a paragraph. Has a toggle for the user to deside where they want 
                this parameter active or not.
            </p>
        </div>
    );
}
export default About;