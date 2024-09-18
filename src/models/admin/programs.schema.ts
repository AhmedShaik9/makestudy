import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, collection: 'programs' })
export class Program {
  @Prop({ type: String, required: true })
  programName: string;

  @Prop({ type: String, required: true })
  programCode: string;

  @Prop({ type: String, required: true })
  programDescription: string;

  @Prop({ type: Array, required: true })
  programImage: string[];
}

export const ProgramSchema = SchemaFactory.createForClass(Program);
