import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async editList(id, userId, body) {
    return await dbContext.List.findOneAndUpdate(id, userId, body).populate('creatorId')
  }

  async deleteList(id) {
    return await dbContext.List.findByIdAndDelete(id).populate('creatorId')
  }

  async createList(body) {
    return await dbContext.List.create(body)
  }

  async findList(query = {}) {
    const list = await dbContext.List.find(query).populate('creatorId')
    return list
  }

  async findListById(id) {
    const list = await dbContext.List.findById(id).populate('creatorId')
    if (!list) {
      throw new BadRequest('Invalid Id')
    }
    return list
  }
}

export const listsService = new ListsService()
