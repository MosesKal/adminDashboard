import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

const YoutubeDescriptionModal = ({ videoLink, onHide }) => {
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  // Fonction pour extraire l'identifiant de la vidéo YouTube de l'URL
  const getVideoIdFromUrl = (url) => {
    const videoIdMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  useEffect(() => {
    const getYoutubeVideoDescription = async () => {
      try {
        let videoId;

        // Vérifie si l'URL est au format "youtu.be"
        if (videoLink.includes("youtu.be")) {
          videoId = getVideoIdFromUrl(videoLink);
        } else {
          // Si ce n'est pas le format "youtu.be", utilisez la méthode URL pour extraire l'ID
          videoId = new URL(videoLink).searchParams.get("v");
        }

        if (!videoId) {
          console.error("Invalid YouTube URL. Unable to extract video ID.");
          return;
        }

        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=AIzaSyCxs-l5yqTQ-KOrots0YH0NRP8FBMC0rC4`
        );

        if (
          response.data &&
          response.data.items &&
          response.data.items.length > 0
        ) {
          const videoDescription =
            response.data.items[0].snippet.description ||
            "No description available";
          const videoDetails = response.data.items[0].snippet;
          const videoThumbnail =
            videoDetails.thumbnails &&
            videoDetails.thumbnails.default &&
            videoDetails.thumbnails.default.url;

          if (videoThumbnail) {
            setDescription(videoDescription);
            setThumbnail(videoThumbnail);
          } else {
            console.error("Thumbnail not available in YouTube API response");
          }
        } else {
          console.error(
            "YouTube API response does not contain expected data"
          );
        }
      } catch (error) {
        console.error(
          "Error while fetching YouTube video description:",
          error
        );
      }
    };

    getYoutubeVideoDescription();
  }, [videoLink]);

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>YouTube Video Description</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {thumbnail && (
            <img
              src={thumbnail}
              alt="YouTube Thumbnail"
              style={{ cursor: "pointer" }}
              onClick={() => window.open(videoLink, "_blank")}
            />
          )}
        </div>
        {/* <p>{description}</p> */}
      </Modal.Body>
    </Modal>
  );
};

export default YoutubeDescriptionModal;

