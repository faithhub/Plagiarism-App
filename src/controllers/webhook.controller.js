const { Messages } = require("../database/models");
const token = "HERE_WE_GO_AGAIN_DUDE";
module.exports = class {
  static async index(req, res) {
    try {
      if (
        req.query["hub.mode"] == "subscribe" &&
        req.query["hub.verify_token"] == token
      ) {
        res.send(req.query["hub.challenge"]);
      } else {
        res.status(400).json({ msg: "bad request dude" });
      }

      res.status(200).json({ msg: "Good request" });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  static async create(req, res) {
    try {
      //   const reviewInfo = {
      //     phone: "23480473684",
      //     text: "jskdbhjbsasa",
      //     field: "jhasvdhjvashjvdjasv",
      //   };
      //   const save = await Messages.create(reviewInfo);
      //   const all = await Messages.findAll();
      //   return res.status(200).json({
      //     msg: {
      //       create: save,
      //       all: all,
      //     },
      //   });
      const body = req.body;
      if (body.field !== "messages") {
        // not from the messages webhook so dont process
        return res.status(400);
      }
      const reviews = body.value.messages.map((message) => {
        const reviewInfo = {
          phone: message.from,
          text: message.text.body,
          field: message,
        };
        Messages.create(reviewInfo).then().catch();
      });

      return res.status(200).json({ msg: "Good one" });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  static async getAll(req, res) {
    try {
      const messages = await Messages.findAll();
      return res.status(200).json(messages);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
};
