import PushItems from '@src/PushItems'

global.PushItems = (): void => {
    const pushItems: PushItems = new PushItems()
    pushItems.main()
}