import React from 'react';
import s from "./posts.module.sass";
import Post from "./post/post";


const Posts = (props) => {

    let postsElement = props.postsData.map( p => <Post userProfile={props.userProfile}
                                                       id={p.id}
                                                       key={p.id}
                                                       name={p.name}
                                                       message={p.message}
                                                       likeCount={p.likeCount} /> );

    let postsOrder = [...postsElement.reverse()]

    let addPostRef = React.createRef();


    let addPost = (e) => {
        e.preventDefault()
        props.addPost();
    }

    let onChange = () => {
        let text = addPostRef.current.value;
        props.onChange(text);
    }
    let Clear = (e) => {
        e.preventDefault()
        let text = ''
        props.onChange(text)
    }
    return(
        <div className={s.posts}>
            {props.isOwner &&
            <form className={s.form}>
                <button className={s.button} onClick={addPost}>Submit</button>
                <textarea  ref={addPostRef} className={s.new_posts}
                           placeholder="New posts" value={props.newPostText} onChange={onChange} />
                <button className={`${s.button} ${s.button2}`} onClick={Clear}>Clear</button>
            </form>}
                {postsOrder}
        </div>
    )
}

export default Posts;