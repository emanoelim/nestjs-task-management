import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TasksController } from './tasks.controller';
import { TasksRespository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
});

const mockUser = {
    username: 'admin',
    id: '123',
    password: 'P455w0rd',
    tasks: [],
};

describe('TaskService', () => {
    let tasksService: TasksController;
    let tasksRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TasksRespository, useFactory: mockTasksRepository },
            ],
        }).compile();

        tasksService = module.get(TasksService);
        tasksRepository = module.get(TasksRespository);
    });

    describe('getTasks', () => {
        it('calls TasksRepository.getTasks and returns the result', async () => {
            tasksRepository.getTasks.mockResolvedValue('SomeValue');
            const result = await tasksService.getTasks(null, mockUser);
            expect(result).toEqual('SomeValue');
        });
    });

    describe('getTaskById', () => {
        it('calls TasksRepository.findOne and returns the result', async () => {
            const mockTask = {
                title: 'Title',
                decription: 'Task description',
                id: '123',
                status: TaskStatus.OPEN,
            };

            tasksRepository.findOne.mockResolvedValue(mockTask);
            const result = await tasksService.getTaskById('123', mockUser);
            expect(result).toEqual(mockTask);
        });
    });

    describe('getTaskById', () => {
        it('calls TasksRepository.findOne and handles an error', async () => {
            tasksRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById('123', mockUser)).rejects.toThrow(NotFoundException);
        });
    });
});