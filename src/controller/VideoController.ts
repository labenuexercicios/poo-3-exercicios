import { Request, Response } from "express";
import { VideoDatabase } from "../database/VideoDatabase";
import { Video } from "../models/Video";
import { TVideoDB } from "../types";

export class VideoController {
    public getPing = async (req: Request, res: Response) => {
        try {
            res.status(200).send({ message: "Pong!" })
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public getVideos = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined

            const videoDatabase = new VideoDatabase()
            const videosDB = await videoDatabase.findVideos(q)

            const videos: Video[] = videosDB.map((videoDB) => new Video(
                videoDB.id,
                videoDB.title,
                videoDB.duration,
                videoDB.upload_date
            ))

            res.status(200).send(videos)
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createVideo = async (req: Request, res: Response) => {
        try {
            const { id, title, duration } = req.body

            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' deve ser string")
            }

            if (typeof title !== "string") {
                res.status(400)
                throw new Error("'title' deve ser string")
            }

            if (typeof duration !== "number") {
                res.status(400)
                throw new Error("'duration' deve ser number")
            }

            const videoDatabase = new VideoDatabase()
            const videoDBExists = await videoDatabase.findVideoById(id)

            if (videoDBExists) {
                res.status(400)
                throw new Error("'id' já existe")
            }

            const newVideo = new Video(
                id,
                title,
                duration,
                new Date().toISOString()
            )

            const newVideoDB: TVideoDB = {
                id: newVideo.getId(),
                title: newVideo.getTitle(),
                duration: newVideo.getDuration(),
                upload_date: newVideo.getUploadDate()
            }

            await videoDatabase.insertVideo(newVideoDB)

            res.status(201).send(newVideo)
        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public updateVideo = async (req: Request, res: Response) => {
        try {
            const id = req.params.id

            const newId = req.body.newId as string
            const newTitle = req.body.newTitle as string
            const newDuration = req.body.newDuration as number

            const videoDatabase = new VideoDatabase();
            const videoDB = await videoDatabase.findVideoById(id);

            if (!videoDB) {
                res.status(400)
                throw new Error("'id' não existe")
            }

            const video = new Video(
                videoDB.id,
                videoDB.title,
                videoDB.duration,
                videoDB.upload_date
            )

            if (newId !== undefined) {
                if (typeof newId !== "string") {
                    res.status(400)
                    throw new Error("'newId' deve ser string")
                }
            }

            if (newTitle !== undefined) {
                if (typeof newTitle !== "string") {
                    res.status(400)
                    throw new Error("'newTitle' deve ser string")
                }
            }

            if (newDuration !== undefined) {
                if (typeof newDuration !== "number") {
                    res.status(400)
                    throw new Error("'newDuration' deve ser number")
                }
            }

            newId && video.setId(newId)
            newTitle && video.setTitle(newTitle)
            newDuration && video.setDuration(newDuration)

            const newVideo: TVideoDB = {
                id: video.getId(),
                title: video.getTitle(),
                duration: video.getDuration(),
                upload_date: video.getUploadDate()
            }

            await videoDatabase.updateVideo(id, newId, newTitle, newDuration);

            res.status(200).send({ message: "Video atualizado com sucesso", newVideo })

        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public deleteVideo = async (req: Request, res: Response) => {
        try {
            const id = req.params.id

            const videoDatabase = new VideoDatabase();
            const videoDB = await videoDatabase.findVideoById(id);

            if (!videoDB) {
                res.status(400)
                throw new Error("'id' não existe")
            }

            const video = new Video(
                videoDB.id,
                videoDB.title,
                videoDB.duration,
                videoDB.upload_date
            )

            await videoDatabase.deleteVideo(id);

            res.status(200).send({ message: "Video deletado com sucesso" })

        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}