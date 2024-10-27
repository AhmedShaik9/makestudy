import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { ViewOn } from 'src/types/view-on';

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

  @Prop({ type: String, required: true, unique: true, slug: 'programName' })
  slug: string;

  // @Prop({ required: true, type: Array, default: ViewOn.Hide })
  // viewOn: ViewOn[];
}

export const ProgramSchema = SchemaFactory.createForClass(Program);
