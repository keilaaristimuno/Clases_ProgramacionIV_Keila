# Guía Git con Sprints — Programacion IV

---

## Antes de empezar: crear el repo en GitHub

1. Entrá a [github.com](https://github.com)
2. Hacé clic en **New repository**
3. Poné el nombre, dejalo en **Public**, y creá el repo vacío (sin README)

---

## PASO 1 — Configurar Git en tu proyecto (una sola vez)

Abrí la terminal dentro de la carpeta de tu proyecto y ejecutá:

```bash
git init
git add .
git commit -m "Inicio del proyecto"
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin master
```

> Reemplazá la URL con la de tu repositorio de GitHub.

---

## PASO 2 — Antes de cada Sprint: crear la rama

Siempre partís desde `master`:

```bash
git checkout master
git checkout -b sprint-1
```

> Cambiá `sprint-1` por el nombre del sprint que corresponda (sprint-2, sprint-3, etc.)

---

## PASO 3 — Durante el Sprint: guardar cambios

Cada vez que quieras guardar tu progreso:

```bash
git add .
git commit -m "Descripción de lo que hiciste"
git push origin sprint-1
```

---

## PASO 4 — Al terminar el Sprint: merge a master

Cuando el Sprint esté completo, lo fusionás a `master`:

```bash
git checkout master
git merge sprint-1
git push origin master
```

---

## PASO 5 — Crear el Tag y el Release

Esto encapsula el Sprint como una versión oficial:

```bash
git tag -a v1.0 -m "Sprint 1 completo"
git push origin v1.0
```

Después en GitHub:
1. Ir a **Releases** → **Draft a new release**
2. Seleccionar el tag `v1.0`
3. Ponerle un título y publicarlo

> Para el Sprint 2 usá `v2.0`, para el 3 usá `v3.0`, etc.

---

## PASO 6 — Arrancar el siguiente Sprint

Siempre desde `master` actualizado:

```bash
git checkout master
git checkout -b sprint-2
```

Y repetís el ciclo desde el Paso 3.

---

## Resumen del flujo completo

```
master (base limpia)
  └── sprint-1  →  trabajás  →  commit  →  push
                                              ↓
                              merge a master + tag v1.0
                                              ↓
  └── sprint-2  →  trabajás  →  commit  →  push
                                              ↓
                              merge a master + tag v2.0
```

---

## Comandos útiles

| Qué querés hacer | Comando |
|---|---|
| Ver en qué rama estás | `git branch` |
| Ver el historial de commits | `git log --oneline` |
| Cambiar de rama | `git checkout nombre-rama` |
| Ver el estado de los archivos | `git status` |
| Ver todos los tags | `git tag` |

---

## ⚠️ Reglas importantes

- **Nunca trabajés directamente en `master`**
- Siempre creá una rama nueva para cada Sprint
- Siempre hacé el merge a `master` cuando el Sprint esté terminado
- Si tu proyecto Angular tiene una subcarpeta, asegurate de que **no tenga su propio `.git`** antes de hacer el primer push

---

*Guía hecha para Programacion IV — UTN 2025*
