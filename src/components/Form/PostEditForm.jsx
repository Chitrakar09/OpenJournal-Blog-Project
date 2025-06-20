import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import databaseService from '../../appwrite/databaseConfig'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { Button, SelectComponent, RTE, InputField } from '../index'
function PostEditForm({ post }) {
    const [loading, setLoading] = useState(false);
    const [ error, setError ] = useState(null);
    const [ previewUrl, setPreviewUrl ] = useState(null);
    // const [ postId, setPostId ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState(null);
    const [ id, setId ] = useState(null);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.Auth.userData);
    console.log(userData)
    const { register, handleSubmit, watch, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            id: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
            image: post?.imageId || null
        },
    });
    const watchedImage = watch("image");

    // function for preview selected image and set post id
    useEffect(() => {

        if (previewUrl) {
            setImageUrl(previewUrl);
        }

        else if (post) {

            if (post.$id) setId(post.$id);

            if (post.imageId) {
                console.log("this is the image id obtained from retrieved post", post.imageId)
                const getImg = async () => {
                    try {
                        const url = databaseService.getFilePreview(post.imageId);
                        console.log("this is the image url obtained from database", url)
                        setImageUrl(url);
                    } catch (error) {
                        console.error("Error fetching image URL:", error);
                        setError("Failed to load image.", error);
                        // If there's an error fetching the image, set imageUrl to null
                        setImageUrl(null);
                    }
                }
                getImg();
            }

            else {
                setImageUrl(null)
            }
        }

    }, [ post, previewUrl ])

    // function to execute after submit
    const postSubmit = async (data) => {
        setLoading(true);
        try {
            console.log("clicked the post button");
            console.log(data);
            if (!data) return;
            //Update post
            if (post) {
                try {
                    let imageIdToUse = null;

                    // If user selected a new image, upload it
                    if (data.image && data.image[0]) {
                        const uploadedImg = await databaseService.uploadFile(data.image[0]);
                        if (uploadedImg && uploadedImg.$id) {
                            imageIdToUse = uploadedImg.$id;
                            // Optionally delete the old image if it exists
                            if (post.imageId) {
                                databaseService.deleteFile(post.imageId);
                            }
                        }
                    } else if (post.imageId) {
                        // No new image, but post already has an image
                        imageIdToUse = post.imageId;
                    }
                    // else imageIdToUse remains null

                    // Update the database
                    const updatedPost = await databaseService.updatePost(
                        post.$id,
                        { ...data, imageId: imageIdToUse }
                    );

                    // Navigate to the post page
                    if (updatedPost) navigate(`/post/${updatedPost.$id}`);
                } catch (error) {
                    console.error("Error updating post:", error);
                    setError(error?.message || String(error));
                }
            }
            // create post
            else {
                // upload image file to the bucket

                // if image is uploaded, then upload the image file to the bucket
                if (data.image && data.image.length !== 0) {
                    try {
                        const img = data.image[ 0 ] ? await databaseService.uploadFile(data.image[ 0 ]) : null;
                        //if uploaded, create post
                        if (img) {
                            const imgID = img.$id
                            console.log("this is the sent image id:", imgID);
                            try {
                                console.log(userData);
                                console.log(userData.$id || userData.userData.$id);
                                const addedPost = await databaseService.createPost({ ...data, userId: userData?.$id || userData?.userData.$id, imageId: imgID });
                                if (addedPost) {
                                    console.log("this is what create post returns from database",addedPost)
                                    navigate(`/post/${addedPost.$id}`);
                                }
                            } catch (error) {
                                console.error("Error creating post:", error);
                                setError(error?.message || String(error));
                            }

                        }

                    } catch (error) {

                        console.log("error uploading image", error)
                        setError(error?.message || String(error));
                        return;

                    }



                }
                // if no image is uploaded, create post without image
                else  {
                    // if no image is uploaded, create post without image
                    console.log("reached here")
                    try {
                        const addedPost = await databaseService.createPost({ ...data, userId: userData.$id, imageId: null});
                        if (addedPost) {
                            navigate(`/post/${addedPost.$id}`);
                        }
                    } catch (error) {
                        console.error("Error creating post:", error);
                        setError(error?.message || String(error));
                    }

                }
            }
        } catch (error) {
            setError(error?.message || String(error));
        } finally {
            setLoading(false);
        }
    }

    {/*
    //generating post id from title

    // converting spaces and alphanumeric value to "-" eg:react-test-ground
    const titleToId = useCallback((value) => {

        if (value && typeof value === "string") return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");

        return "";
    }, [])

    //every time, title's input changes, post id is set.
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') setPostId(titleToId(value.title));
        })

        return () => subscription.unsubscribe();

    }, [ watch, titleToId, ])

    */}

    // to generate a image url for live preview of the uploaded image
    useEffect(() => {
        if (watchedImage && watchedImage[ 0 ] instanceof File) {
            const file = watchedImage[ 0 ];
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
        else {
            setPreviewUrl(null);
        }

    }, [ watchedImage ])

    return (
        <form
            onSubmit={handleSubmit(postSubmit)}
            className="bg-white text-[#14213d] p-6 rounded-2xl shadow-lg w-full max-w-full mx-auto"
        >
            <h2 className="text-2xl font-bold mb-6 text-center">Create a New Post</h2>

            {error && <h1 className='w-full text-center text-sm text-red-600 font-medium mb-4 bg-red-100 border border-red-300 rounded px-3 py-2'>{error}</h1>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

                {/* container 1 */}
                <div className="md:col-span-2 md:border-r-2 pr-6 space-y-4">
                    {/* Title */}
                    <InputField label="Title" type='text' name="title" placeholder='Enter Title' {...register("title", { required: true })} />

                    {/* Status */}
                    <div>
                        <SelectComponent options={[ "active", 'inactive' ]} label="Status" {...register("status", { required: true })} />
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2">
                        <RTE label={"Content"} control={control} name='content' defaultValue={getValues("content")} />
                    </div>
                </div>

                {/* container 2 */}

                {/* Image */}
                <div className="space-y-3 flex flex-col items-center">
                    <label className="block mb-2 font-semibold">Add image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#fca311] file:text-white hover:file:bg-[#e18b0c]"
                        {...register("image", { required: false })}
                    />
                    {imageUrl && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 max-h-44 overflow-y-auto">
                            <img src={imageUrl} alt='Preview' className="rounded-lg object-cover object-center" />
                        </div>
                    )}
                </div>

            </div>

            {/* Button */}
            <Button
                text={loading ? (post ? "Updating..." : "Posting...") : post ? "Update" : "Post"}
                type='submit'
                use='postSubmit'
                bgColor='bg-[#fca311]'
                hoverColor='hover:bg-[#e5940c]'
                activeColor='active:bg-[#cf8608]'
                className='mt-5 h-12 w-full'
                disabled={loading}
            />

            {id ? (
                <Link to={`/post/${id}`}>
                    <Button
                        text="Cancel"
                        type="button"
                        use="cancel"
                        bgColor="bg-[#14213d]"
                        hoverColor="hover:bg-[#1a2b4a]"
                        activeColor="active:bg-[#0f1b2e]"
                        className="mt-2 h-12 w-full text-white"
                    />
                </Link>) : (
                <Link to={'/allPost'}>
                    <Button
                        text="Cancel"
                        type="button"
                        use="cancel"
                        bgColor="bg-[#14213d]"
                        hoverColor="hover:bg-[#1a2b4a]"
                        activeColor="active:bg-[#0f1b2e]"
                        className="mt-2 h-12 w-full text-white"
                    />
                </Link>
            )}
        </form>
    )
}

export default PostEditForm
