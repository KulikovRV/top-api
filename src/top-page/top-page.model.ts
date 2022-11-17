import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop, index } from '@typegoose/typegoose';

export enum TopLevelCategory {
	Courses = 0,
	Services,
	Books,
	Products,
}

export class HhData {
	@prop()
	count: number;

	@prop()
	juniorSalary: number;

	@prop()
	middleSalary: number;

	@prop()
	seniorSalary: number;
}

export class TopPageAdvantage {
	@prop()
	title: string;

	@prop()
	description: string;
}

export interface TopPageModel extends Base {}

@index({ '$**': 'text' })
export class TopPageModel extends TimeStamps {
	@prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@prop()
	secondCategory: string;

	@prop({ unique: true })
	alias: string;

	@prop({ text: true })
	title: string;

	@prop()
	category: string;

	@prop()
	hh?: HhData;

	@prop({ type: () => [TopPageAdvantage]})
	advantages: TopPageAdvantage[];

	@prop()
	seoText: string;

	@prop()
	tagsTitle: string;

	@prop({type: () => [String]})
	tags: string[];
}
