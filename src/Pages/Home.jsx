import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

function Home() {
    const icons = [
        {
            name: "instagram",
            icon: faInstagram,
            link: "https://www.instagram.com/chitrakar_09/9"
        }, {
            name: "facebook",
            icon: faFacebook,
            link: "https://www.facebook.com/chitrakar09"
        }, {
            name: "Linkedin",
            icon: faLinkedin,
            link: "https://www.linkedin.com/in/pratyush-chitrakar/"
        }, {
            name: "Github",
            icon: faGithub,
            link: "https://github.com/Chitrakar09"
        } ]

    // const featuredImg = [
    //     {
    //         id: 1,
    //         src: "1.jpg"
    //     },
    //     {
    //         id: 2,
    //         src: "2.jpg"
    //     },
    //     {
    //         id: 3,
    //         src: "3.jpg"
    //     },
    //     {
    //         id: 4,
    //         src: "4.jpg"
    //     },
    // ]

    // checks if logged in. if logged in then redirect to all post
    const isLoggedIn = useSelector((state) => state.Auth.status);
    const navigate = useNavigate();
    return (
        <>
            <div className="min-h-full w-full bg-gradient-to-b from-[#000000] via-[#14213d] to-[#1d2a50] text-white px-4 md:px-20 py-10">
                {/* Hero Section */}
                <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10">
                    <div className="w-full text-center flex flex-col items-center justify-center">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Share Your <br /> Story with Us
                        </h1>
                        <div className="mt-6 bg-[#2646a4] p-6 rounded-xl text-white shadow-lg max-w-md mx-auto md:mx-0">
                            <h2 className="text-xl font-semibold mb-2">Unveil Your Inner Writer</h2>
                            <p className="text-sm md:text-base mb-4">
                                OpenJournal welcomes you to a space where creativity knows no bounds. Start writing, sharing,
                                and connecting with like-minded individuals on a platform designed for your thoughts and ideas
                                to flourish.
                            </p>
                            <Link to={isLoggedIn?"/allPost":"/login"}>
                                <button type='button' className="bg-[#fca311] text-black px-5 py-2 rounded-full font-semibold hover:bg-[#e5940c] transition">
                                Start Writing
                            </button>
                            </Link>
                            
                        </div>
                    </div>

                </div>

                {/* Story Section */}
                <div className="text-center mt-24">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story Begins</h2>
                    <div className="flex justify-center mb-4">
                        <div className="w-10 h-10 bg-[#fca311] rounded-full flex items-center justify-center text-black font-bold">
                            ➤➤➤
                        </div>
                    </div>
                    <p className="max-w-xl mx-auto text-sm md:text-base text-[#e5e5e5]">
                        OpenJournal is more than just a blog platform; it’s a gateway to a world of stories waiting to be
                        told. Our mission is to provide a nurturing environment for individuals to explore their creativity,
                        share their insights, and connect through the art of writing.
                    </p>
                </div>

                {/* Follow Us Grid 
                <div className="mt-20">
                    <h3 className="text-2xl font-semibold text-center mb-8">Follow Us</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {featuredImg.map((img) => (
                            <div key={img.id} className="bg-[#e5e5e5] rounded-lg overflow-hidden">
                                <img src={img.src} alt={`Featured Image ${img.id}`} className="w-full h-40 object-cover object-center" />
                            </div>
                        ))}
                    </div>
                </div>*/}

                {/* contact us */}
                <div className="mt-20">
                    <h3 className="text-xl font-semibold text-center mb-4">Contacts</h3>
                    <div className="flex items-center space-x-5 justify-center text-xl">
                        {icons.map((featuredIcon) => (
                            <div key={featuredIcon.name}>
                                <a
                                    href={featuredIcon.link}
                                    className="no-underline text-inherit hover:no-underline focus:outline-none hover:text-[#fca311]"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={featuredIcon.icon} />
                                </a>
                            </div>

                        ))}
                    </div>

                </div>
            </div>
        </>

    )
}

export default Home