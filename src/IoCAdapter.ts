import {ClassConstructor, IocAdapter} from "routing-controllers";
import DependencyContainer from "tsyringe/dist/typings/types/dependency-container";

export class IoCAdapterImpl implements IocAdapter {
    constructor (
        private readonly container: DependencyContainer
    ) {
    }

    get<T> (someClass: ClassConstructor<T>): T {
        // const childContainer = this.container.createChildContainer()
        // childContainer.bind(API_SYMBOLS.ClientIp).toConstantValue(action.context.ip)
        return this.container.resolve<T>(someClass)
    }
}
