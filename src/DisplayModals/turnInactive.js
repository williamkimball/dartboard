class turnInactive {
  static turnInactive = () => {
    document.querySelector(".modal").classList.remove("is-active");
  };
}

module.exports = turnInactive;