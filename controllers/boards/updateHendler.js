const Board = require("../../models/Board");

const updateBoardHendler = async (req, res) => {
  try {
    const { _id } = req.params;
    const board = await Board.findById(_id);
    
    if (board.user.email === req.session.user.email) {
      board.name = req.body.name;
      board.color = req.body.color;
      const updateBoard = await board.save();
      res.status(200).json(updateBoard);
    } else {
      res.status(404).json({ message: "You are not update this board" });
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: "There was a server side problem " });
  }
};

module.exports = updateBoardHendler;