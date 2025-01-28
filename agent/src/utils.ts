// TODO: getTokenForProvider should be removed, and the token handling should be managed by the plugin itself
// We'll be removing ModelProviderName and all hardcoded model provisioning, in favor of plugins with runtime function calls
// settings should also probably go away

import { Character, logger, ModelProviderName, settings } from "@elizaos/core";
export function getSecret(character: Character, secret: string) {
	return character.settings?.secrets?.[secret] || process.env[secret]
}

export const wait = (minTime = 1000, maxTime = 3000) => {
	const waitTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime
	return new Promise((resolve) => setTimeout(resolve, waitTime))
}

export const logFetch = async (url: string, options: any) => {
	logger.debug(`Fetching ${url}`)
	// Disabled to avoid disclosure of sensitive information such as API keys
	// logger.debug(JSON.stringify(options, null, 2));
	return fetch(url, options)
}

export function getTokenForProvider(provider: ModelProviderName, character: Character): string | undefined {
	switch (provider) {
		// no key needed for llama_local or gaianet
		case ModelProviderName.LLAMALOCAL:
			return ""
		case ModelProviderName.OLLAMA:
			return ""
		case ModelProviderName.GAIANET:
			return "";
		case ModelProviderName.BEDROCK:
			return ""
		case ModelProviderName.OPENAI:
			return character.settings?.secrets?.OPENAI_API_KEY || settings.OPENAI_API_KEY
		case ModelProviderName.ETERNALAI:
			return character.settings?.secrets?.ETERNALAI_API_KEY || settings.ETERNALAI_API_KEY
		case ModelProviderName.NINETEEN_AI:
			return character.settings?.secrets?.NINETEEN_AI_API_KEY || settings.NINETEEN_AI_API_KEY
		case ModelProviderName.LLAMACLOUD:
		case ModelProviderName.TOGETHER:
			return character.settings?.secrets?.LLAMACLOUD_API_KEY || settings.LLAMACLOUD_API_KEY || character.settings?.secrets?.TOGETHER_API_KEY || settings.TOGETHER_API_KEY || character.settings?.secrets?.OPENAI_API_KEY || settings.OPENAI_API_KEY
		case ModelProviderName.CLAUDE_VERTEX:
		case ModelProviderName.ANTHROPIC:
			return character.settings?.secrets?.ANTHROPIC_API_KEY || character.settings?.secrets?.CLAUDE_API_KEY || settings.ANTHROPIC_API_KEY || settings.CLAUDE_API_KEY
		case ModelProviderName.REDPILL:
			return character.settings?.secrets?.REDPILL_API_KEY || settings.REDPILL_API_KEY
		case ModelProviderName.OPENROUTER:
			return character.settings?.secrets?.OPENROUTER_API_KEY || settings.OPENROUTER_API_KEY
		case ModelProviderName.GROK:
			return character.settings?.secrets?.GROK_API_KEY || settings.GROK_API_KEY
		case ModelProviderName.HEURIST:
			return character.settings?.secrets?.HEURIST_API_KEY || settings.HEURIST_API_KEY
		case ModelProviderName.GROQ:
			return character.settings?.secrets?.GROQ_API_KEY || settings.GROQ_API_KEY
		case ModelProviderName.GALADRIEL:
			return character.settings?.secrets?.GALADRIEL_API_KEY || settings.GALADRIEL_API_KEY
		case ModelProviderName.FAL:
			return character.settings?.secrets?.FAL_API_KEY || settings.FAL_API_KEY
		case ModelProviderName.ALI_BAILIAN:
			return character.settings?.secrets?.ALI_BAILIAN_API_KEY || settings.ALI_BAILIAN_API_KEY
		case ModelProviderName.VOLENGINE:
			return character.settings?.secrets?.VOLENGINE_API_KEY || settings.VOLENGINE_API_KEY
		case ModelProviderName.NANOGPT:
			return character.settings?.secrets?.NANOGPT_API_KEY || settings.NANOGPT_API_KEY
		case ModelProviderName.HYPERBOLIC:
			return character.settings?.secrets?.HYPERBOLIC_API_KEY || settings.HYPERBOLIC_API_KEY

		case ModelProviderName.VENICE:
			return character.settings?.secrets?.VENICE_API_KEY || settings.VENICE_API_KEY
		case ModelProviderName.ATOMA:
			return character.settings?.secrets?.ATOMASDK_BEARER_AUTH || settings.ATOMASDK_BEARER_AUTH
		case ModelProviderName.NVIDIA:
			return character.settings?.secrets?.NVIDIA_API_KEY || settings.NVIDIA_API_KEY
		case ModelProviderName.AKASH_CHAT_API:
			return character.settings?.secrets?.AKASH_CHAT_API_KEY || settings.AKASH_CHAT_API_KEY
		case ModelProviderName.GOOGLE:
			return character.settings?.secrets?.GOOGLE_GENERATIVE_AI_API_KEY || settings.GOOGLE_GENERATIVE_AI_API_KEY
		case ModelProviderName.MISTRAL:
			return character.settings?.secrets?.MISTRAL_API_KEY || settings.MISTRAL_API_KEY
		case ModelProviderName.LETZAI:
			return character.settings?.secrets?.LETZAI_API_KEY || settings.LETZAI_API_KEY
		case ModelProviderName.INFERA:
			return character.settings?.secrets?.INFERA_API_KEY || settings.INFERA_API_KEY
		case ModelProviderName.DEEPSEEK:
			return character.settings?.secrets?.DEEPSEEK_API_KEY || settings.DEEPSEEK_API_KEY
		case ModelProviderName.LIVEPEER:
			return character.settings?.secrets?.LIVEPEER_GATEWAY_URL || settings.LIVEPEER_GATEWAY_URL
		default:
			const errorMessage = `Failed to get token - unsupported model provider: ${provider}`
			logger.error(errorMessage)
			throw new Error(errorMessage)
	}
}