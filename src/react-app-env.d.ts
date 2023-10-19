/// <reference types="react-scripts" />
declare module '*.svg' {
    const content: React.FC<React.SVGProps<SVGSVGElement>>;
    export default content;
}

declare module '*.ttf';

declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}

declare module '*.module.scss' {
    const content: Record<string, string>;
    export default content;
}

declare module '*.png' {
    const content: string;
    export default content;
}

declare module '*.jpg' {
    const content: string;
    export default content;
}

declare module '*.jpeg' {
    const content: string;
    export default content;
}