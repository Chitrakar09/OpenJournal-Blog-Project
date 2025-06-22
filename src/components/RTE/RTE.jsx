import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && (
                <label
                    htmlFor={label} //for seo purpose
                    className="block text-[#14213d] text-lg font-medium mb-2"
                >
                    {label}
                </label>
            )}

            <Controller
                name={name || 'BlogEditor'}
                defaultValue={defaultValue}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey="tdps1k1huxpwcnisdy37pomd7y0gtxx1bpwnon0na402xphe"
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true, // desktop menubar enabled
                            plugins: [
                                "help", "link", "wordcount"
                            ],
                            toolbar:
                                "undo redo | blocks | bold italic underline strikethrough | " +
                                "forecolor backcolor | link | alignleft aligncenter alignright alignjustify | " +
                                "bullist numlist outdent indent | removeformat | charmap anchor | ltr rtl | help",
                            mobile: {
                                menubar: false, // mobile menubar disabled
                                toolbar: [
                                    'undo redo bold italic underline',
                                    'bullist numlist',
                                    'link'
                                ]
                                // Optionally, set a breakpoint (default is 768px)
                                // breakpoint: 600
                            },
                            content_style: `
                                body {
                                border: 1px solid black;
                                background-color: #f0f0f0;
                                color: #000000;
                                font-family: Helvetica, Arial, sans-serif;
                                padding: 1rem;
                                }
                                a { color: #fca311; }
                                h1, h2, h3, h4, h5, h6 { color: #14213d; }
                                strong { color: #000000; }
                                em { color: #000000; }
                                `,
                        }}
                        onEditorChange={onChange}
                    />
                )}


            />
        </div>

    )
}

export default RTE

//TODO configure code highlighting in web page
//TODO configure, media and image plugin