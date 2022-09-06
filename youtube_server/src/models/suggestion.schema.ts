import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export type SuggestionDocument = Suggestion & Document;

@Schema(
    { timestamps: true }
)
export class Suggestion {
    @IsNotEmpty()
    @Prop()
    title: String;

    @Prop([])
    vec: [];

    @Prop()
    dist: number;
}

export const SuggestionSchema = SchemaFactory.createForClass(Suggestion);