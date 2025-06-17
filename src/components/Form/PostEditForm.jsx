import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import databaseService from '../../appwrite/databaseConfig'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Button, SelectComponent, RTE, InputField } from '../index'
function PostEditForm({ post }) {
    const [ error, setError ] = useState(null);
    const [ previewUrl, setPreviewUrl ] = useState(null);
    const [ postId, setPostId ] = useState(null);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.Auth.userData);
    const { register, handleSubmit, watch, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            id: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });
    const watchedImage = watch("image");

    // function to execute after submit
    const postSubmit = async (data) => {
        if (!data) return;
        console.log(data)
        //Update post
        if (post) {
            //to update image file in the bucket
            console.log(data.image)
            try {
                const updatedImgId = data.image[ 0 ] ? await databaseService.uploadFile(data.image[ 0 ]) : null;
                //if new uploaded, then delete the previous one
                if (updatedImgId) databaseService.deleteFile(post.imageId);

                try {
                    //update the database
                    const updatedPost = await databaseService.updatePost(post.$id, { ...data, imageId: updatedImgId ? updatedImgId.$id : null });

                    //navigate to the post page
                    if (updatedPost) navigate(`/post/${updatedPost.$id}`);
                } catch (error) {
                    console.error("Error updating post:", error);
                    setError(error);
                }
            }
            catch (error) {
                console.log("error uploading image", error)
                setError(error);
                return;

            }

        }
        // create post
        else {
            // upload image file to the bucket
            console.log(data.image.length)

            // if image is uploaded, then upload the image file to the bucket
            if (data.image && data.image.length !== 0) {

                try {
                    const img = data.image[ 0 ] ? databaseService.uploadFile(data.image[ 0 ]) : null;
                    //if uploaded, create post
                    if (img) {
                        const imgId = img.$id;
                        data.imageId = imgId; //dynamically added property for imageId property in database.
                        try {
                            const addedPost = await databaseService.createPost({ ...data, userId: userData.$id, postId: postId });
                            if (addedPost) {
                                navigate(`/post/${addedPost.$id}`);
                            }
                        } catch (error) {
                            console.error("Error creating post:", error);
                            setError(error);
                        }

                    }

                } catch (error) {

                    console.log("error uploading image", error)
                    setError(error);
                    return;

                }



            }
            // if no image is uploaded, create post without image
            else if (data.image && data.image.length === 0) {
                // if no image is uploaded, create post without image
                try {
                    const addedPost = await databaseService.createPost({ ...data, userId: userData.$id, imageId: null, postId: postId });
                if (addedPost) {
                    console.log(addedPost)
                    navigate(`/post/${addedPost.$id}`);
                }
                } catch (error) {
                    console.error("Error creating post:", error);
                    setError(error)
                }
                
            }
        }
    }

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

    // to generate a image url for live preview of the uploaded image
    useEffect(() => {
        if (watchedImage && watchedImage.length > 0) {
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

            {error && <h1 className='text-lg font-bold mb-6 text-center text-red-500'>{error}</h1>}

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
                    <label className="block mb-2 font-semibold">Featured Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#fca311] file:text-white hover:file:bg-[#e18b0c]"
                        {...register("image", { required: false })}
                    />
                    {post || previewUrl && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 max-h-44 overflow-y-auto">
                            <img src={post ? post.imageId : previewUrl} alt='Preview' className="rounded-lg object-cover object-center" />
                        </div>
                    )}
                </div>

            </div>

            {/* Button */}
            <Button text={post ? "Update" : "Post"} type='submit' use='postSubmit' bgColor='bg-[#fca311]' hoverColor='hover:bg-[#e5940c]' activeColor='active:bg-[#cf8608]' className='mt-5 h-12 w-full' />
        </form>
    )
}

export default PostEditForm

//TODO recheck and handle same postid issue