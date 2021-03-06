import React, { useState } from "react";
import { createNewPost, editPost, uploadImage } from "../utils/posts";
import { useDispatch, useSelector } from "react-redux";
import { addPosts, editPosts } from "../features/postSlice";
import Picker from "emoji-picker-react";

const CreatePost = ({ editDetails, closeEditModal, closeCreateModal }) => {
  const dispatch = useDispatch();
  const [showEmojisBox, setShowEmojisBox] = useState(false);
  const [desc, setDesc] = useState(editDetails ? editDetails.desc : "");
  const [imageFile, setImageFile] = useState(
    editDetails ? editDetails.image : null
  );

  const { user } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!desc.length) {
      return alert("please write something");
    }
    if (editDetails) {
      editPost(editDetails._id, desc);
      dispatch(
        editPosts({
          ...editDetails,
          desc,
          image: imageFile,
        })
      );
      return closeEditModal();
    }
    const imageUrl = await uploadImage(imageFile);
    const newPost = await createNewPost(desc, imageUrl);
    newPost.userId = user;

    dispatch(addPosts(newPost));
    setDesc("");
    setImageFile("");
    closeCreateModal(false);
  };
  const onEmojiClick = (event, emojiObject) => {
    setDesc((previousValues) => previousValues + emojiObject.emoji);
  };
  return (
    <div
      className="p-4 px-9 bg-primary-50 pt-5"
      onClick={() => setShowEmojisBox(false)}
    >
      <div className="mb-1 flex  items-center ">
        <div className="w-11 h-11 bg-primary-200 overflow-hidden rounded-full flex justify-center items-center font-bold text-primary-900">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="profile"
              className="object-cover h-full"
            />
          ) : (
            user.name && user.name[0].toUpperCase()
          )}
        </div>

        <div className="leading-5 w-full pl-2">
          <input
            placeholder={`hey ${user.name} share your... !`}
            className="w-full focus:outline-none bg-primary-50"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            style={{ wordWrap: "break-word" }}
          />
        </div>
      </div>
      <img
        src={
          editDetails ? imageFile : imageFile && URL.createObjectURL(imageFile)
        }
      />
      <form
        className="text-grayLight flex justify-between mt-2 p-4 items-center"
        onSubmit={submitHandler}
      >
        <div>
          <label
            htmlFor="imageFile"
            className="cursor-pointer hover:text-primary-600"
          >
            <span className="material-icons-outlined mr-2">collections</span>
            <input
              type="file"
              id="imageFile"
              accept=".png,.jpeg,.jpg"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </label>
          <button
            onClick={(e) => {
              setShowEmojisBox((preVal) => !preVal);
              e.stopPropagation();
            }}
            type="button"
            className="hover:text-primary-600"
          >
            <span className="material-icons-outlined ml-2">
              sentiment_satisfied_alt
            </span>
          </button>
          {showEmojisBox && (
            <div
              className=" absolute z-30 drop-shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="text-white text-center w-100 bg-gradient-to-br from-primary-500 to-primary-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-primary-200 hover:shadow-md  dark:focus:ring-primary-800 font-medium rounded opacity-70  text-sm  px-5 py-2.5 text-center mr-2 mb-2 hover:opacity-90"
        >
          {editDetails ? "Edit" : "Post"}
        </button>
      </form>
    </div>
  );
};

export { CreatePost };
