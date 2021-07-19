import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async createBoard(body) {
    return await dbContext.Board.create(body)
  }

  async findBoard(query = {}) {
    const board = await dbContext.Board.find(query).populate('creatorId')
    return board
  }

  async findBoardById(id) {
    const board = await dbContext.Board.findById(id).populate('creatorId')
    if (!board) {
      throw new BadRequest('Error: Invalid ID - Board does not exist.')
    }
    return board
  }

  async editBoard(id, userId, body) {
    return await dbContext.Board.findOneAndUpdate(id, userId, body).populate('creatorId')
  }

  async deleteBoard(id) {
    return await dbContext.Board.findByIdAndDelete(id).populate('creatorId')
  }
}

export const boardsService = new BoardsService()
