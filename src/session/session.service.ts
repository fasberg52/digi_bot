import { Injectable, Logger } from '@nestjs/common';
import { FindOptionsWhere, In, IsNull, MoreThan, Not } from 'typeorm';
import { Request } from 'express';
import { SessionEntity } from './entity/session.entity';
import { UserEntity } from '../users/entity/users.entity';
import { SessionRepository } from './repository/session.respository';
import { StringHelper } from '../helper/string-helper';
@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  getDevice(req: Request) {
    return req.headers;
  }

  async create(
    partialSession: Partial<SessionEntity>,
    req: Request,
  ): Promise<SessionEntity> {
    partialSession.device = this.getDevice(req);
    const session = await this.sessionRepository.create(partialSession);
    return await this.sessionRepository.save(session);
  }

  async findByUserId(userId: number): Promise<SessionEntity> {
    return this.sessionRepository.findOne({
      relations: {
        user: true,
      },
    });
  }

  async findByUserIdAndToken(
    userId: number,
    token: string,
  ): Promise<SessionEntity> {
    return this.sessionRepository.findOne({
      relations: {
        user: true,
      },
      where: { userId, token },
    });
  }

  async deleteByToken(token: string) {
    return this.sessionRepository.delete({
      token,
    });
  }

  async deleteByUserIdAndToken(userId: number, token: string) {
    return this.sessionRepository.delete({
      token,
      userId,
    });
  }

  // async deleteByUserIdAndFcmRegId(userId: number, pushSubscription: any) {
  // 	return this.sessionRepository.delete({
  // 		userId: Not(userId),
  // 		pushSubscription: pushSubscription,
  // 	});
  // }

  async deleteByUserIdAndFcmRegId(userId: number) {
    const pushSubscriptionWhere: FindOptionsWhere<SessionEntity> = {
      userId: Not(userId),
    };

    const sessionsToDelete = await this.sessionRepository.find({
      where: pushSubscriptionWhere,
    });

    if (sessionsToDelete.length > 0) {
      await this.sessionRepository.remove(sessionsToDelete);
    }

    return;
  }

  async getAll(user: UserEntity, req: Request): Promise<SessionEntity[]> {
    const listSession: SessionEntity[] = await this.sessionRepository.getAll(
      user.id,
    );
    const tokenCurrent = await this.extractTokenFromHeader(req);
    await listSession.map(async (session) => {
      const userAgent = session.device?.['user-agent'];
      const deviceName = await StringHelper.getDeviceNameToUserAgent(userAgent);
      session.device = deviceName;
      if (tokenCurrent === session.token) {
        session['deviceCurrent'] = true;
      } else {
        session['deviceCurrent'] = false;
      }
      delete session.token;
    });
    return listSession;
  }

  async logOut(userId: number, req: Request) {
    const token = await this.extractTokenFromHeader(req);
    await this.deleteByUserIdAndToken(userId, token);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async delete(id: number, user: UserEntity): Promise<void> {
    await this.sessionRepository.delete({ id, userId: user.id });
  }

  async userActiveSessions(userId: number): Promise<number> {
    return await this.sessionRepository.count({
      where: { userId },
    });
  }
}
