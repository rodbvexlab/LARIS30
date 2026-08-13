# LARIS 30 — CONTENT PENDING
## Controle de Conteúdo, Assets e Dados Pendentes

> Documento operacional.
> Deve ser atualizado à medida que informações reais forem confirmadas.
> O Claude Code não deve inventar nenhum item marcado como pendente.

---

## 1. Informações já confirmadas

- [x] Wordmark oficial: **LARIS 30**
- [x] Evento: aniversário de 30 anos da Larissa
- [x] Tema: **Pool Party / In Full Color**
- [x] Data: **22/08/2026**
- [x] Formato do local: **chácara**
- [x] Rateio: **R$ 85,00 por pessoa**
- [x] Modelo de bebidas: **BYOB + base coletiva**
- [x] Chave PIX: **11952196901** (tipo: telefone)
- [x] WhatsApp da Larissa: **11952196901**
- [x] Região da chácara: **Zona Sul**
- [x] Design System aprovado
- [x] Arquitetura mobile aprovada
- [x] Motion System aprovado
- [x] Fotos reais da Larissa recebidas
- [x] Fotos da chácara recebidas e disponíveis no projeto
- [x] Galeria visual da chácara implementada entre PIX e Localização

---

## 2. Horário

- [x] Horário de início: **14:00** (`time.start`)
- [ ] Horário previsto de encerramento (`time.end` segue nulo)

Como o encerramento não está confirmado, a interface comunica sempre uma
abertura, nunca uma janela: **"A partir das 14h00"**. O valor armazenado
continua sendo `'14:00'`; `14h00` é apenas apresentação.

---

## 3. Localização

- [x] Região: **Zona Sul** (`venue.area`)
- [ ] Nome da chácara, se houver
- [ ] Endereço completo
- [ ] Cidade confirmada (`venue.city` segue nulo — não inferir da região)
- [ ] CEP
- [ ] Link Google Maps
- [ ] Link Waze
- [ ] Ponto de referência, se necessário

Estado atual exibido:

```text
CHÁCARA
ZONA SUL
ENDEREÇO EM BREVE
```

Maps e Waze permanecem visualmente indisponíveis até que as URLs existam.

Não inventar localização.

---

## 4. PIX

- [x] Chave PIX: **11952196901**
- [x] Tipo da chave: **telefone**
- [ ] Nome do titular, se será exibido
- [ ] Prazo final para pagamento
- [ ] Texto definitivo de instrução do PIX

Valor confirmado:

**R$ 85,00**

A chave é armazenada só com dígitos (`11952196901`), que é o valor copiado
para a área de transferência. A exibição formatada — `(11) 95219-6901` — é
apenas apresentação e nunca substitui o valor armazenado.

---

## 5. RSVP

### Campos aprovados
- [x] Nome completo
- [x] WhatsApp
- [x] Restrição alimentar

### Ainda definir
- [x] WhatsApp que receberá dúvidas / comprovantes: **11952196901**
- [ ] Data limite para confirmação
- [ ] Se o PIX será obrigatório para considerar presença confirmada
- [ ] Se o comprovante será enviado por WhatsApp
- [ ] Mensagem final após RSVP

### Integração
Planejado:

`React -> Google Apps Script -> Google Sheets`

Ainda pendente:
- [ ] criar planilha
- [ ] criar Apps Script
- [ ] publicar endpoint
- [ ] configurar URL no projeto
- [ ] testar submissão
- [ ] testar erro / indisponibilidade

---

## 6. Acompanhantes

- [x] **Confirmado** (`policies.companions`): acompanhante não é permitido.
      Dúvidas pelo WhatsApp da Larissa.
- [ ] Crianças possuem alguma regra diferente?

---

## 7. Piscina

- [x] **Confirmado** (`policies.pool`): piscina liberada; o convidado traz o
      próprio kit de piscina.
- [ ] Horário de uso da piscina, se houver restrição
- [ ] Restrições específicas do espaço (vidro na área da piscina etc.)

---

## 7b. O que levar

- [x] **Confirmado** (`policies.bring`): presença + bebida favorita.

---

## 8. Estacionamento

- [x] **Confirmado** (`policies.parking`): há estacionamento dentro da chácara.
- [ ] Quantidade aproximada de vagas
- [ ] Existe orientação de acesso?

---

## 9. Bebidas / BYOB

Confirmado:
- [x] Modelo BYOB
- [x] Convidado pode levar bebida alcoólica de preferência

Planejamento prevê base coletiva com:
- [x] água
- [x] refrigerantes
- [x] sucos
- [x] gelo
- [x] welcome drink
- [x] cerveja base prevista no planejamento operacional

### Confirmado (`policies.drinks`)
- [x] Modelo: **Open Cooler** — o convidado traz sua bebida favorita
- [x] **Refrigerante** garantido
- [x] **Suco** garantido

Welcome drink e cerveja **não** são mencionados na interface enquanto não
forem confirmados.

Ainda validar para publicação:
- [ ] texto definitivo do bloco BYOB da seção 08
      (hoje ainda diz "Os demais detalhes sobre bebidas serão confirmados em
      breve", o que passou a conflitar com a resposta do FAQ — ver §21)
- [ ] restrição de vidro na área da piscina, se houver

---

## 10. Alimentação / Rateio

Planejamento atual contempla:
- [x] chácara
- [x] churrasco
- [x] acompanhamentos
- [x] frutas
- [x] sobremesa / picolés prevista
- [x] decoração
- [x] welcome drink
- [x] água
- [x] refrigerantes
- [x] sucos
- [x] gelo
- [x] descartáveis / insumos
- [x] mimos

Antes da publicação final:
- [ ] validar com Larissa quais itens permanecem confirmados

### "What's Included" — resolvido
- [x] A seção deixou de listar inventário (água, gelo, refrigerante, frutas,
      mimos) e passou a comunicar experiência:
      **Churrasco · Música boa · Muita festa · Bons papos · Gente querida ·
      Energia lá em cima**

Isso remove a dependência de confirmar item a item para publicar a seção.

---

## 11. Fotos da Larissa

Recebidas:
- [x] foto close-up divertida com óculos
- [x] foto 3/4 / corpo em ambiente de evento
- [x] composição/sticker adicional

Ainda realizar:
- [ ] selecionar definitivamente a foto do Hero
- [ ] aprovar recorte final
- [ ] aprovar tratamento de luz/cor
- [ ] definir outline/sticker treatment
- [ ] exportar versão final WebP/AVIF
- [ ] exportar versão transparente quando necessário
- [ ] definir uso das demais fotos no The Mood / Closing

### Proporção de trabalho do Hero
Preferência:
- `4:5`
- `3:4`
- recorte vertical transparente quando necessário

Não recortar cabeça/cabelo de forma agressiva.

---

## 12. Fotos da Chácara

Fotos disponíveis em `web/src/assets/venue/` e galeria implementada.

Curadoria utilizada:
- [x] piscina / deck
- [x] vista geral da piscina e do jardim
- [x] jardim / lago
- [x] área de sinuca
- [x] jardim
- [x] acesso / estacionamento

O endereço completo continua pendente e não deve ser inferido a partir das
fotos. Ver §3.

### Tratamento posterior

Permitido:
- luz
- cor
- contraste
- perspectiva
- limpeza visual
- enquadramento
- acabamento editorial

Não inventar infraestrutura.

---

## 13. The Mood — Decisão de conteúdo

- [x] **Decidido: stickers / referências visuais do projeto, não fotografia.**

A seção não depende mais de curadoria fotográfica. Composição editorial de
stickers sobre Deep Ink, montada a partir dos assets já existentes no projeto:
heart, smileys, sticker da Larissa, sparkle e a chrome sphere (2º touchpoint do
Disco Journey).

Observação técnica: os arquivos de sticker são JPEG, sem canal alpha. Os de
fundo claro são recortados em disco (o fundo vira a borda die-cut do próprio
sticker); o da Larissa tem fundo preto puro e usa `mix-blend-mode: lighten`
para sumir contra o ink.

Ainda validar:
- [ ] direitos de uso das imagens de referência para publicação
- [ ] se algum sticker deve ser substituído por arte original

---

## 14. Dress Code

Direção confirmada:

**SUMMER VIBES** + orientação por círculos de cor
(Coral, Bubblegum, Sun Yellow, Pool Blue, Summer Orange)

- [x] **Não depende mais de fotos.** A galeria de quatro looks foi removida.
- [x] Seção simplificada: kicker + headline + paleta.

---

## 15. Assets Decorativos

Linguagem visual já aprovada:
- [x] disco ball
- [x] chrome sparkles
- [x] heart / sticker
- [x] smiley
- [x] sunburst

Ainda definir assets finais de produção:
- [ ] disco ball final
- [ ] chrome sparkle set final
- [ ] sticker de coração final
- [ ] smiley final
- [ ] drink / tropical asset, se necessário
- [ ] óculos Y2K, se necessário
- [ ] textura grain

Regra:
usar poucos elementos e evitar poluição.

---

## 16. Conteúdo Textual

Ainda revisar:
- [ ] texto final do The Vibe
- [ ] texto final do Rateio
- [ ] texto final do What's Included
- [ ] texto final do BYOB
- [ ] texto final do RSVP
- [ ] texto final do PIX
- [ ] texto da Localização
- [ ] respostas do FAQ
- [ ] fechamento final

---

## 17. FAQ — Respostas

Todas as seis respostas são lidas do `event.ts`; nenhuma permanece em "Em breve".

- [x] Posso levar acompanhante? → `policies.companions`
- [x] O que devo levar? → `policies.bring`
- [x] A piscina estará liberada? → `policies.pool`
- [x] Terá estacionamento? → `policies.parking`
- [x] Como funciona a bebida? → `policies.drinks`
- [x] Qual o horário? → derivado de `time.start`

---

## 18. Produção — Claude Code

Antes da implementação:
- [ ] extrair Design System em `reference/design-system/`
- [ ] garantir `CLAUDE.md` na raiz
- [ ] adicionar este arquivo em `docs/CONTENT_PENDING.md`
- [ ] adicionar briefing em `docs/LARI30_BRIEFING_MASTER.md`
- [ ] organizar assets em `assets/`
- [ ] criar commit inicial do handoff
- [ ] abrir Claude Code na raiz
- [ ] executar auditoria sem alterações
- [ ] revisar plano de implementação
- [ ] iniciar bootstrap do `web/`

---

## 19. Deploy

Ainda pendente:
- [ ] repositório GitHub
- [ ] nome final do repositório
- [ ] projeto Vercel
- [ ] domínio / subdomínio final
- [ ] variável de ambiente do RSVP, se aplicável
- [ ] build de produção
- [ ] teste em URL pública

---

## 20. QA Final

### Mobile
- [ ] iPhone Safari
- [ ] navegador interno do WhatsApp no iPhone
- [ ] Android Chrome
- [ ] navegador interno do WhatsApp no Android

### Funcional
- [ ] Hero
- [ ] scroll
- [ ] parallax
- [ ] marquee
- [ ] Dress Code drag
- [ ] RSVP
- [ ] PIX copy
- [ ] Maps
- [ ] Waze
- [ ] FAQ
- [ ] estados de erro
- [ ] estados de sucesso

### Performance
- [ ] imagens otimizadas
- [ ] lazy loading
- [ ] sem assets excessivamente pesados
- [ ] `prefers-reduced-motion`
- [ ] sem scroll travado
- [ ] sem layout shift relevante

### Conteúdo
- [ ] data
- [ ] horário
- [ ] endereço
- [ ] rateio
- [ ] PIX
- [ ] FAQ
- [ ] links
- [ ] ortografia

---

## 21. Regra de Ouro

Se a informação não estiver confirmada neste documento ou no `event.ts`, o sistema deve:

1. usar estado **EM BREVE**, quando aplicável; ou
2. ocultar a informação até confirmação.

**Nunca inventar conteúdo para preencher lacunas.**

---

## 22. Inconsistências abertas — resolver antes do Content Freeze

### BYOB (seção 08) × FAQ "Como funciona a bebida?"

Com `policies.drinks` confirmado, as duas seções passaram a dizer coisas
diferentes:

| Onde | Texto atual |
|---|---|
| BYOB (seção 08) | "Os demais detalhes sobre bebidas serão confirmados em breve." |
| FAQ | "Open Cooler: traga sua bebida favorita. Também teremos refrigerante e suquinho!" |

A frase do BYOB deixou de ser verdadeira: os detalhes **foram** confirmados.
Ela não foi alterada porque a redação atual é decisão oficial registrada; a
troca precisa de aprovação.

- [ ] definir o texto de apoio do BYOB à luz do Open Cooler
