# AI MARKETPLACE

I have been fine-tuning different LLM models like LLAMA 2, LLAMA 3, GRANITE, GPT, etc for quite a long time now for various tasks like code generation, text summarization, question answering, etc. So I thought why don't I make my models open source? This is when I came up with the idea AI marketplace. Something like the app store or Play Store for AI models. Users can access all the models that I fine-tuned as well as also can access third-party models from hugging face through the application. 

That's not all in the playground tab by drag and drop ability anyone can combine multiple models together to create a custom pipeline of models, such as the question-answering model and code generator, to create pipelines that automate complex workflows. The platform also supports tools such as text-to-speech and speech-to-text, pdf-to-text, etc functionalities that users can integrate into the pipeline

Once the pipeline is created user even can export their custom pipelines as executable files (APKs or other formats), enabling local execution on devices like Android.

## Watch the Video

Check out my YouTube video about this project: [Watch on YouTube](https://youtu.be/EzR1d62Bais?si=x63z5Yak9Ni2FBt3)

Or watch the video below:

[![Watch the video](https://img.youtube.com/vi/EzR1d62Bais/0.jpg)](https://youtu.be/EzR1d62Bais?si=x63z5Yak9Ni2FBt3)

## LLM MODELS 

Here is my fine-tuned LLM model: [Huggingface/Sakib323](https://huggingface.co/Sakib323)


<p align="center"><img src="https://i.imgur.com/a9QWW0v.png"></p>

## Usage

### Create an App

```
# with npx
$ npx create-nextron-app my-app --example with-tailwindcss

# with yarn
$ yarn create nextron-app my-app --example with-tailwindcss

# with pnpm
$ pnpm dlx create-nextron-app my-app --example with-tailwindcss
```

### Install Dependencies

```
$ cd my-app

# using yarn or npm
$ yarn (or `npm install`)

# using pnpm
$ pnpm install --shamefully-hoist
```

### Use it

```
# development mode
$ yarn dev (or `npm run dev` or `pnpm run dev`)

# production build
$ yarn build (or `npm run build` or `pnpm run build`)
```
