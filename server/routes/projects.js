import express from 'express'
import Project from '../models/Project.js'

const router = express.Router()

// Lấy tất cả projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 })
        res.json(projects)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Lấy project theo ID hoặc slug
router.get('/:idOrSlug', async (req, res) => {
    try {
        const { idOrSlug } = req.params

        // Thử tìm theo ID trước (nếu là ObjectId hợp lệ)
        let project = null
        if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
            project = await Project.findById(idOrSlug)
        }

        // Nếu không tìm thấy, thử tìm theo slug
        if (!project) {
            project = await Project.findOne({ slug: idOrSlug })
        }

        if (!project) {
            return res.status(404).json({ message: 'Không tìm thấy dự án' })
        }

        // Tăng lượt xem
        project.views += 1
        await project.save()

        res.json(project)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Tạo project mới
router.post('/', async (req, res) => {
    try {
        const project = new Project(req.body)
        const newProject = await project.save()
        res.status(201).json(newProject)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Cập nhật project
router.put('/:slug', async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true, runValidators: true }
        )
        if (!project) {
            return res.status(404).json({ message: 'Không tìm thấy dự án' })
        }
        res.json(project)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Xóa project
router.delete('/:slug', async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({ slug: req.params.slug })
        if (!project) {
            return res.status(404).json({ message: 'Không tìm thấy dự án' })
        }
        res.json({ message: 'Đã xóa dự án thành công' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router
