import express from "express";

class RoomController {
  getAll(req: express.Request, res: express.Response) {
    return res.status(200).send({ rooms: [] })
  }
}

export const roomController = new RoomController()

