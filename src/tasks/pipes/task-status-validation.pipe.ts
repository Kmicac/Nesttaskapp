import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../tasks.model";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedstatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(` '${value}' is not a valid Status`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.allowedstatuses.indexOf(status);
        return idx !== -1;
    }
}