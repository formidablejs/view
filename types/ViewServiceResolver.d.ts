import { ServiceResolver } from "@formidablejs/framework";

export class ViewServiceResolver extends ServiceResolver {
    routes(): string;
    dataPage(): string;
}
