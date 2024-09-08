import { Repository } from 'typeorm';

export abstract class BaseRepository<T> extends Repository<T> {}
